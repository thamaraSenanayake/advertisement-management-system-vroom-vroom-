package org.packageId.first;


import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;






@Path("/myRatings")

public class MYRatings {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String getRatings(@FormParam("id")String companyName) {
		int positiveCount,negativeCount;
		String sql;
		sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '1'";
		positiveCount = sqlClass.rowCount(sql);
		
		sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '0'";
		negativeCount = sqlClass.rowCount(sql);
		return positiveCount+","+negativeCount;
		
    }

}
