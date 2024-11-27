import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { NotionDetailForES } from "@/types/entities/notionDetailForES";
import { Client } from "@elastic/elasticsearch";

type ElasticsearchDocument = Record<string, any>; // 문서의 기본 타입

/**
 * Initializes an Elasticsearch client with the given configurations.
 * @returns {Client} Configured Elasticsearch client instance.
 */
export function initClient(): Client {
  const client = new Client({
    node: process.env.NEXT_PUBLIC_ELASTICSEARCH_URL!,
    auth: {
      username: process.env.NEXT_PUBLIC_ELASTICSEARCH_USERNAME!,
      password: process.env.NEXT_PUBLIC_ELASTICSEARCH_PASSWORD!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  return client;
}

/**
 * Creates an index with custom n-gram and nori tokenizer settings if it doesn't already exist.
 * @param client - Elasticsearch client instance.
 */
export async function createIndex(client: Client): Promise<void> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  const exists = await client.indices.exists({ index: indexName });

  if (!exists) {
    const settings = getNgramAndNoriSettings(indexName);
    await client.indices.create(settings);
    console.log(`Index '${indexName}' created successfully.`);
  } else {
    console.log(`Index '${indexName}' already exists.`);
  }
}

export async function updateIndexSettings(client: Client): Promise<void> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  const settings = getNgramAndNoriSettings(indexName);
  const exists = await client.indices.exists({ index: indexName });
  if (exists) {
    await client.indices.putSettings(settings);
    console.log(`Index '${indexName}' updated successfully.`);
  } else {
    console.log(`Index '${indexName}' not exists.`);
  }
}

/**
 * Returns the index settings with n-gram and nori tokenizers.
 * @param indexName - The name of the index.
 * @returns Elasticsearch index settings.
 */
function getNgramAndNoriSettings(indexName: string) {
  return {
    index: indexName,
    settings: {
      analysis: {
        analyzer: {
          my_analyzer: {
            tokenizer: "nori_tokenizer",
            filter: ["lowercase", "edge_ngram_filter"],
          },
          standard_analyzer: {
            tokenizer: "nori_tokenizer",
            filter: ["lowercase"],
          },
        },
        filter: {
          edge_ngram_filter: {
            type: "edge_ngram",
            min_gram: 2,
            max_gram: 10,
          },
        },
      },
    },
    mappings: {
      properties: {
        title: {
          type: "text",
          analyzer: "my_analyzer",
          search_analyzer: "standard_analyzer",
        },
        description: {
          type: "text",
          analyzer: "my_analyzer",
          search_analyzer: "standard_analyzer",
        },
      },
    },
  };
}

/**
 * Inserts a document into the Elasticsearch index.
 * @param client - Elasticsearch client instance.
 * @param document - The document to be inserted.
 */
export async function insertNotionData(
  client: Client,
  document: Partial<NotionDetailForES>,
): Promise<void> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  await client.index({
    index: indexName,
    document,
  });
}

/**
 * Deletes a document from the Elasticsearch index by ID.
 * @param client - Elasticsearch client instance.
 * @param documentId - The ID of the document to be deleted.
 */
export async function deleteNotionData(
  client: Client,
  documentId: string,
): Promise<void> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  await client.delete({
    index: indexName,
    id: documentId,
  });
}

/**
 * Searches for documents in the Elasticsearch index using a keyword.
 * @param client - Elasticsearch client instance.
 * @param keyword - The keyword to search for.
 * @param offset - The starting offset for pagination.
 * @returns Array of search results including total count.
 */
export async function searchNotionData(
  client: Client,
  keyword: string,
): Promise<Array<ElasticsearchDocument & { total_count: number }>> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  const response = await client.search({
    index: indexName,
    body: {
      query: {
        multi_match: {
          query: keyword,
          fields: ["title", "description"],
        },
      },
    },
  });
  return response.hits.hits.map((hit: any) => ({
    ...hit._source,
    ...hit.highlight,
  }));
}
