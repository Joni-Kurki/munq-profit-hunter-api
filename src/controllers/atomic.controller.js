import { AtomicMarketApi } from "atomicmarket";
import fetch from "node-fetch";
import { ATOMIC_API_PROD } from "../common/constants.js";

const atomicMarketApi = new AtomicMarketApi(ATOMIC_API_PROD, "atomicmarket", 
	{fetch: fetch}
);

export const getSalesData = async (collection, schema, page, limit, order, state) => {
	try {
		return await atomicMarketApi.getSales({ 
			state: state, 
			schema_name: schema, 
			collection_name: collection,
			order: order,
			limit: limit
		}, page, limit);
	} catch (error){
		console.log(error);
		return {
			error: error
		};
	}
}