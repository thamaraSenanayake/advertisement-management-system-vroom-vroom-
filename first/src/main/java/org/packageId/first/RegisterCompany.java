package org.packageId.first;


import java.util.Random;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;




@Path("/registerCompany")

public class RegisterCompany {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String login(@FormParam("comName")String comName,@FormParam("password")String password,@FormParam("email")String email,@FormParam("tel")String tel,@FormParam("address")String address,@FormParam("ownerName")String ownerName,@FormParam("dataEnterType")String dataEnterType) {
		int response;
		String sql;
		sql = "SELECT * FROM `company` WHERE `name` = '"+comName+"'";
		response = sqlClass.rowCount(sql);
		
		if(response == 0) {
			sql = "INSERT INTO `company`(`name`, `ownerName`, `address`, `tel`, `email`, `password`) VALUES ('"+comName+"','"+ownerName+"','"+address+"','"+tel+"','"+email+"','"+password+"')";
			response = sqlClass.updateIteamSql(sql, dataEnterType);
			
			if(response == 1 ) {
				
		    	Random rand = new Random();
		    	int n1 = rand.nextInt(7);
		    	int n2 = rand.nextInt(7);
		    	int n3 = rand.nextInt(7);
		    	int n4 = rand.nextInt(7);
		    	
		    	String key = Integer.toString(n1)+""+Integer.toString(n2)+""+Integer.toString(n3)+""+Integer.toString(n4);
		    		    	
		    	sql ="UPDATE `company` SET `keyValue`='"+key+"' WHERE name= '"+comName+"'";
		    	response = sqlClass.updateIteamSql(sql, "onlyThis");
		    	
		    	
		    	String encryptkey = Encryption.encryption(key);
				
		    	return "1,"+encryptkey+","+comName;
			}
			
			return  "0,,";	
		}
		else {
			return  "Try a differnt Comapny name,,";
		}
		
    }

}
