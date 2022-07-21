import { handleLandPlotsSalesData, sortBy } from "../handlers/mom-land-plot.handler.js";
import { getSalesData } from "../controllers/atomic.controller.js";

export const getLandPlots = async (req, res) => {
	try {
		let plotData = [];

		const numOfPages = 10;

		for(let page=1; page<numOfPages+1; page++){
			const salesData = await getSalesData("onmars", "land.plots", page, 100, "desc", 1);
			plotData = plotData.concat(handleLandPlotsSalesData(salesData));
		}

		return res.status(200).send({
			landPlots: sortBy(plotData, "price")
		});
	} catch (error){
		return res.status(500).send({error: error})
	}
}