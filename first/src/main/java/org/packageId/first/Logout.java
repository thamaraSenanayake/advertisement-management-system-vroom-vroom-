package org.packageId.first;


import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;






@Path("/logout")

public class Logout {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String getRatings(@FormParam("id")String id,@FormParam("dataEnterType")String dataEnterType) {
		int response = 0;
		String sql;
		sql = "SELECT * FROM `company` WHERE `name` ='"+id+"'";
		response = sqlClass.rowCount(sql);
		
		if(response == 1) {
			sql = "UPDATE `company` SET `keyValue`='' WHERE `name` = '"+id+"'";
			response = sqlClass.updateIteamSql(sql, dataEnterType);
			if(response == 1) {
				return "Done";
			}
		}
		
		sql = "SELECT * FROM `user` WHERE `id` = '"+id+"'";
		response = sqlClass.rowCount(sql);
		
		if(response == 1) {
			sql = "UPDATE `user` SET `keyValue`='' WHERE `id` ='"+id+"'";
			response = sqlClass.updateIteamSql(sql, dataEnterType);
			if(response == 1) {
				return "Done";
			}
		}
		

		return "error";
		
    }

}
