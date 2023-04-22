import { postToShopify } from "../../util/shopify";

export default async function handler(_req, res) {
  const data = await postToShopify({
    query: `
    query ($gids: [ID!]!) {
        nodes(ids: $gids) {
          ... on Metafield {
            id
            key
            value
            namespace
          }
        }
      }
        `,
    variables: {
      gids: JSON.parse(
        '["gid://shopify/Metaobject/1590558944","gid://shopify/Metaobject/1590526176"]'
      ),
    },
  });

  res.status(200).json(data);
}
