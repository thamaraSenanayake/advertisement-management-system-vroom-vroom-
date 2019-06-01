package org.packageId.first;


import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;







@Path("/userRatings")

public class UserRatings {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String getRatings(@FormParam("id")String companyName) {
		int positiveCount,negativeCount;
		String sql;
		sql = "SELECT * FROM `sellerRates` JOIN company ON company.name = sellerRates.sellerID WHERE company.email = '"+companyName+"' AND `feedBack` = '1'";
		positiveCount = sqlClass.rowCount(sql);
		
		sql = "SELECT * FROM `sellerRates` JOIN company ON company.name = sellerRates.sellerID WHERE company.email = '"+companyName+"' AND `feedBack` = '0'";
		negativeCount = sqlClass.rowCount(sql);
		return positiveCount+","+negativeCount;
		
    }

}
