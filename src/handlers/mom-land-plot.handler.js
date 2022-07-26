import { MOM_BUILDINGS_DATA_NAMES } from "../common/constants.js";

export const handleLandPlotsSalesData = (salesData) => {
	console.log(salesData[0]);

	const handledData = salesData.map(sale => {

		return {
			availableSpace: getAvailableSpace(sale.assets),
			buildingsData: getBuildingsData(sale.assets),
			isBundle: sale.assets.length > 1,
			price: handlePrice(sale.price),
			rarity: sale.assets.length === 1 ? sale.assets[0].data.rarity : null,
			saleId: Number(sale.sale_id),
			seller: sale.seller,
		}
	});

	return handledData;
}

export const sortBy = (data, type) => {
	switch(type){
		case "price":
			return data.sort((a,b) => a.price.amount - b.price.amount);
		default:
			return data;
	}
}

const handlePrice = (price) => {
	if(!price || !price?.token_symbol || !price?.amount || !price?.token_precision) return null;

	return {
		symbol: price.token_symbol,
		amount: Math.round(price.amount / Math.pow(10, price.token_precision)).toFixed(2)
	}
}

const getAvailableSpace = (assets) => {
	if(assets.length === 1) return Number(assets[0].data.available_space);

	return assets.reduce((prev, current) => prev + Number(current.data.available_space), 0)
}

const getBuildingsData = (assets) => {
	let buildingArray = [];
	
	for(let asset of assets){
		for(let buildingName of MOM_BUILDINGS_DATA_NAMES)
			buildingArray = buildingArray.concat(checForkBuildings(asset, buildingName));
	}

	return buildingArray;
}

const checForkBuildings = (asset, buildingName) => {
	let buildings = [];
	for(let key of Object.keys(asset.data)){
		if(key.startsWith(buildingName)){
			buildings.push(handleBuildingFound(key, buildingName, asset.data[key]))
		}
	}
	return buildings;
}

const handleBuildingFound = (buildingNameInData, buildingNameSearch, value) => {
	const edition = getGeneration(buildingNameInData);

	const lastIndexOfRarityLevel = buildingNameInData.lastIndexOf("_");
	const buildingRarityAndLevel = buildingNameInData.substring(lastIndexOfRarityLevel + 1);

	const rarityLevelObject = getBuildingRarityAndLevel(buildingRarityAndLevel);

	return {
		building: buildingNameSearch,
		edition: edition ?? null,
		rarityLevel: rarityLevelObject,
		quantity: Number(value)
	}
}

const getBuildingRarityAndLevel = (value) => {
	if(value.length !== 2 && value.length !== 3) return null;
	
	let rarity = value.substring(0,1);
	let level = value.substring(1); 

	return {
		rarity: rarity,
		level: Number(level)
	}
}

const getGeneration = (buildingNameInData) => {
	const containsEdition = buildingNameInData.indexOf("-") > -1;

	if(buildingNameInData.includes("-22_")) return "Gen 2";
	else if(buildingNameInData.includes("-gen3_")) return "Gen 3";

	return !containsEdition ? "Gen 1" : "Unknown";
}