require('dotenv').config();
const axios = require('axios');

const SHOP = process.env.SHOP;
const TOKEN = process.env.TOKEN;

const scriptUrl =
  'https://customizer-api-l1w1.onrender.com/customizer-widget.js';

async function registerScriptTag() {
  try {
    const response = await axios.post(
      `https://${SHOP}/admin/api/2025-07/script_tags.json`,
      {
        script_tag: {
          event: 'onload',
          src: scriptUrl,
        },
      },
      {
        headers: {
          'X-Shopify-Access-Token': TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(' ScriptTag registered:', response.data.script_tag);
  } catch (error) {
    console.error(
      '  Error registering ScriptTag:',
      error.response?.data || error.message
    );
  }
}

registerScriptTag();
