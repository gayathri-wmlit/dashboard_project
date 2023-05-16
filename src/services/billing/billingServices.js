import { genericGetService, parseObjToQuery } from "../auth/generics";

export async function getBillingService(query,authT) {
    return genericGetService(`/billing/?${parseObjToQuery(query)}`,authT);
  }
  

