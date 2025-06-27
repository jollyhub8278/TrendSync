import axios from "axios";

export const getConnectedAccounts = async (req, res) => {
  try {
    const accessToken = req.user?.accessToken; // You may also get it from DB

    if (!accessToken) {
      return res.status(401).json({ error: "Missing access token" });
    }

    // Step 1: Get user's Facebook Pages
    const fbPagesRes = await axios.get(
      `https://graph.facebook.com/v20.0/me/accounts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    const pages = fbPagesRes.data.data;

    // Step 2: For each page, get Instagram Business account (if any)
    const accountsWithInstagram = await Promise.all(
      pages.map(async (page) => {
        const igRes = await axios.get(
          `https://graph.facebook.com/v20.0/${page.id}`,
          {
            params: {
              fields: "instagram_business_account",
              access_token: page.access_token,
            },
          }
        );

        return {
          pageName: page.name,
          pageId: page.id,
          igAccount: igRes.data.instagram_business_account || null,
        };
      })
    );

    res.json({ accounts: accountsWithInstagram });
  } catch (err) {
    console.error("FB Account Fetch Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
};
