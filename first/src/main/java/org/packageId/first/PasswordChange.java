package org.packageId.first;



import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import org.packageId.first.dataBase.sqlClass;

@Path("/passwordChange")

public class PasswordChange {
	@POST
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormParam("currentPassword")String currentPassword,@FormParam("newPassword")String newPassword,@FormParam("key")String key,@FormParam("id")String id,@FormParam("dataEnterType")String dataEnterType,@FormParam("type")String type) {
		int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		int response;
    		String checkSql = null,updateSql = null;
    		
    		if(type.equals("company")) {
    			updateSql = "UPDATE `company` SET `password`='"+newPassword+"' WHERE `name` = '"+id+"'";
    			checkSql ="SELECT * FROM `company` WHERE `name` = '"+id+"' AND `password` = '"+currentPassword+"'";
    		}
    		else {
    			updateSql = "UPDATE `user` SET `password`='"+newPassword+"' WHERE `id` = '"+id+"'";
    			checkSql ="SELECT * FROM `user` WHERE `id` = '"+id+"' AND `password` = '"+currentPassword+"'";
    		}
    		
    		response = sqlClass.rowCount(checkSql);
    		
    		if(response == 1) {
    			response = sqlClass.updateIteamSql(updateSql, dataEnterType);
        		if(response == 1){
        			return "Done";
        		}
        		else {
        			return "try again latter";	
        		}
    		}
    		else {
    			return "invalid current password";
    		}
    		
    		
    	}
    	else {
    		return "invalid user";
    	}
		
		
    }
	
}

