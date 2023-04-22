import { postToShopify } from "../../util/shopify";

export default async function handler(req, res) {
  // Parse lineItems from request headers
  const lineItemsHeader = req.headers["x-line-items"];
  let lineItems;

  if (lineItemsHeader) {
    try {
      lineItems = JSON.parse(lineItemsHeader);
    } catch (error) {
      res.status(400).json({ error: "Invalid x-line-items header format" });
      return;
    }
  } else {
    res.status(400).json({ error: "x-line-items header is missing" });
    return;
  }

  const data = await postToShopify({
    // query: `
    // mutation {
    //     checkoutCreate(input: {
    //       lineItems: [{ variantId: "gid://shopify/ProductVariant/42895837167840", quantity: 1 }]
    //     }) {
    //       checkout {
    //         id
    //         webUrl
    //       }
    //       userErrors {
    //         field
    //         message
    //       }
    //     }
    //   }

    // `,
    query: `
            mutation($lineItems: [CheckoutLineItemInput!]!) {
              checkoutCreate(input: {
                lineItems: $lineItems
              }) {
                checkout {
                  id
                  webUrl
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
    variables: { lineItems },
  });

  res.status(200).json(data);
}

// [{ variantId: "gid://shopify/ProductVariant/7687490601184", quantity: 1 }]
