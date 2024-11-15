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

/**
 * Returns the index settings with n-gram and nori tokenizers.
 * @param indexName - The name of the index.
 * @returns Elasticsearch index settings.
 */
function getNgramAndNoriSettings(indexName: string) {
  return {
    index: indexName,
    settings: {
      index: {
        max_ngram_diff: 20,
      },
      analysis: {
        filter: {
          ngram_filter: {
            type: "ngram",
            min_gram: 1,
            max_gram: 20,
          },
        },
        analyzer: {
          ngram_analyzer: {
            type: "custom",
            tokenizer: "nori_tokenizer",
            filter: ["lowercase", "ngram_filter"],
          },
        },
      },
    },
    mappings: {
      properties: {
        title: {
          type: "text",
          analyzer: "ngram_analyzer",
        },
        description: {
          type: "text",
          analyzer: "ngram_analyzer",
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
  offset?: number,
): Promise<Array<ElasticsearchDocument & { total_count: number }>> {
  const indexName = process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!;
  const response = await client.search({
    index: indexName,
    // from: offset,
    // size: 4,
    body: {
      query: {
        multi_match: {
          query: keyword,
          fields: ["title", "description"],
        },
      },
    },
  });

  const total = (response.hits.total as { value: number })?.value ?? 0;

  return response.hits.hits.map((hit: any) => ({
    ...hit._source,
    total_count: total,
  }));
}
