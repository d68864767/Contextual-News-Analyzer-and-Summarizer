const axios = require('axios');

class ContextAnalyzer {
  static async contextualize(content, openai) {
    try {
      // Prepare the prompt for the GPT-3 model
      const prompt = `Provide context for the following text:\n\n${content}`;

      // Set the maximum token length for the context
      const maxTokens = 100;

      // Generate the context using the GPT-3 model
      const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: maxTokens
      });

      // Extract the context from the GPT-3 response
      const context = gptResponse.data.choices[0].text.trim();

      return context;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

module.exports = ContextAnalyzer;
