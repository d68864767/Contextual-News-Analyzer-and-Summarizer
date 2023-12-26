const axios = require('axios');

class Summarizer {
  static async summarize(content, openai) {
    try {
      // Prepare the prompt for the GPT-3 model
      const prompt = `Summarize the following text:\n\n${content}`;

      // Set the maximum token length for the summary
      const maxTokens = 60;

      // Generate the summary using the GPT-3 model
      const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: maxTokens
      });

      // Extract the summary from the GPT-3 response
      const summary = gptResponse.data.choices[0].text.trim();

      return summary;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = Summarizer;
