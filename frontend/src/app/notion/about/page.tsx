import { encrypt } from "@/utils/crypto";
import { getNotionDetail } from "@/utils/notion";
import { redirect } from "next/navigation";

const About = async ({ searchParams }: { searchParams: { id: string } }) => {
  let redirectUrl = "/";
  try {
    // notion checking
    const url = searchParams.id;
    const result = await getNotionDetail(url);
    if (!result) return;
    const encResult = encrypt(
      JSON.stringify(result),
      process.env.NEXT_PUBLIC_AES_SCERET_KEY!,
    );
    redirectUrl = `/notion/create/?data=${encResult}`;
  } catch (error) {
    console.error(error);
  }
  redirect(redirectUrl);
};

export default About;
