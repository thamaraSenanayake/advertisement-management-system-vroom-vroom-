package org.packageId.first;



import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import org.packageId.first.dataBase.sqlClass;

@Path("/genralSettings")

public class GenralSettings {
	@POST
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormParam("tel")String tel,@FormParam("address")String address,@FormParam("key")String key,@FormParam("id")String id,@FormParam("dataEnterType")String dataEnterType,@FormParam("type")String type) {
		int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		int response;
    		String sql;
    		
    		if(type.equals("company")) {
    			sql = "UPDATE `company` SET `address`='"+address+"',`tel`= '"+tel+"' WHERE `name` = '"+id+"'";
    		}
    		else {
    			sql = "UPDATE `user` SET `address`='"+address+"',`tel`='"+tel+"' WHERE `id` = '"+id+"'";
    		}
    		response = sqlClass.updateIteamSql(sql, dataEnterType);
    		if(response == 1){
    			return "Done";
    		}
    		else {
    			return "try again latter";	
    		}
    		
    	}
    	else {
    		return "invalid user";
    	}
		
		
    }
	
}

