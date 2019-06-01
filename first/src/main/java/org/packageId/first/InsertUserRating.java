package org.packageId.first;



import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import org.packageId.first.dataBase.sqlClass;

@Path("/insertUserRating")

public class InsertUserRating {
	@POST
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormParam("companyName")String companyName,@FormParam("status")String status,@FormParam("key")String key,@FormParam("id")String id,@FormParam("dataEnterType")String dataEnterType,@FormParam("type")String type) {
		int check = Encryption.keyCheck(key, id);
		
    	if(check == 1) {
    		int response = 0;
    		String sql = null;
    		
    		sql = "SELECT * FROM `sellerRates` WHERE `userID` = '"+id+"' AND `sellerID` = '"+companyName+"' ";
    		int count = sqlClass.rowCount(sql);
    		
    		if(count == 1) {
    			sql = "UPDATE `sellerRates` SET `feedBack`='"+status+"' WHERE `userID`= '"+id+"' AND `sellerID`= '"+companyName+"'";
    			response = sqlClass.updateIteamSql(sql, dataEnterType);
    			
    			if(response == 1){
    				sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '1'";
    				int positiveCount = sqlClass.rowCount(sql);
    				System.out.println(sql);
    				sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '0'";
    				int negativeCount = sqlClass.rowCount(sql);
    				System.out.println(sql);
        			return "Done,"+positiveCount+","+negativeCount;
        		}
    			
    		}
    		else {
    			sql = "INSERT INTO `sellerRates`(`userID`, `sellerID`, `feedBack`) VALUES ('"+id+"','"+companyName+"','"+status+"')";
    			response = sqlClass.updateIteamSql(sql, dataEnterType);
    			
    			if(response == 1){
    				sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '1'";
    				int positiveCount = sqlClass.rowCount(sql);
    				System.out.println(sql);
    				sql = "SELECT * FROM `sellerRates` WHERE sellerID = '"+companyName+"' AND `feedBack` = '0'";
    				int negativeCount = sqlClass.rowCount(sql);
    				System.out.println(sql);
        			return "Done,"+positiveCount+","+negativeCount;
        		}
    			
    		}
    		
    		
    		
    		
    		return "try again latter";	
    		
    		
    	}
    	else {
    		return "invalid user";
    	}
		
		
    }
	
}

