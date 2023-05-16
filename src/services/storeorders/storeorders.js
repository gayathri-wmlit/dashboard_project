import { genericGetService, parseObjToQuery } from "../auth/generics";

export async function getStoreOrdersService(query,authT) {
  return genericGetService(`metrics/store-orders/?${parseObjToQuery(query)}`,authT);
   
  }