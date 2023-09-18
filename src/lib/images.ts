import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: 'REPLACE WITH YOUR API KEY',
	dangerouslyAllowBrowser: true
});

export async function generateImage(prompt: string) {
	let res = await openai.images.generate({
		prompt: prompt,
		n: 1,
		size: "1024x1024",
	});

	let image_url = res["data"][0]["url"];
	return res["data"][0]["url"];
}
