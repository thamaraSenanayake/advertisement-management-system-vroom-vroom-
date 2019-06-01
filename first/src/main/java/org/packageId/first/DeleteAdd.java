package org.packageId.first;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;






@Path("/deleteAdd")

public class DeleteAdd {
	@POST
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormParam("key")String key,@FormParam("id")String id,@FormParam("deleteAddvertisment")String deleteAddvertisment,@FormParam("dataEnterType")String dataEnterType) {
    	
		int response;
		String sql;
		
		int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		sql = "SELECT * FROM `advertisement` WHERE `id` = '"+deleteAddvertisment+"' AND userID = '"+id+"'";
    		System.out.println(sql);
    		response = sqlClass.rowCount(sql);
    		if(response == 1){
    			sql = "DELETE FROM `advertisement` WHERE `id` = '"+deleteAddvertisment+"'";
        		response = sqlClass.updateIteamSql(sql, dataEnterType);
        		
        		if(response == 1){
        			return "done";	
        		}
        		else {
        			return "error";
        		}
    		}
    		else {
    			return "Dont have access to delete this advertisement";	
    		}
    	}
    	else {
    		return "invalid user";
    	}
		
		
    }

}
