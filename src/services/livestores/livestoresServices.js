import { genericGetService, parseObjToQuery } from "../auth/generics";

export async function getLiveStoresService(authT) {
    return genericGetService(`/metrics/live-stores/`,authT);
  }