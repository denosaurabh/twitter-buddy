import PocketBase, { Record } from "pocketbase";

const pb = new PocketBase(process.env.POCKETBASE_URL);

const CUSTOMERS_COLLECTIONS = "customers";
const APIKEYS_COLLECTIONS = "apiKeys";

/* ******************* GET OPERATIONS ***************** */

export const getCustomerDataWithCustomerId = async (
  customerId: string
): Promise<Record> => {
  const result = await pb.collection(CUSTOMERS_COLLECTIONS).getOne(customerId);
  return result;
};

export const getCustomerDataWithHashedAPIKey = async (
  hashedAPIKey: string
): Promise<Record> => {
  const result = await pb.collection(APIKEYS_COLLECTIONS).getOne(hashedAPIKey);
  return result;
};

export const doesThisHashedAPIKeyExists = async (
  hashedAPIKey: string
): Promise<boolean> => {
  const result = await pb.collection(APIKEYS_COLLECTIONS).getOne(hashedAPIKey);

  console.log(result);

  return !!result.id;
};

/* ******************* SET OPERATIONS ***************** */

export const setCustomerData = async (
  customerId: string,
  data: object
): Promise<Record> => {
  const doesAlreadyExists = await pb
    .collection(CUSTOMERS_COLLECTIONS)
    .getOne(customerId);

  if (doesAlreadyExists.id) {
    const result = await pb
      .collection(CUSTOMERS_COLLECTIONS)
      .update(customerId, data);

    return result;
  } else {
    // create New
    const result = await pb
      .collection(CUSTOMERS_COLLECTIONS)
      .create(customerId, data);

    return result;
  }
};

export const setAPIKeyData = async (
  apiKeyId: string,
  customerData: object
): Promise<Record> => {
  const result = await pb
    .collection(APIKEYS_COLLECTIONS)
    .create(apiKeyId, customerData);

  return result;
};
