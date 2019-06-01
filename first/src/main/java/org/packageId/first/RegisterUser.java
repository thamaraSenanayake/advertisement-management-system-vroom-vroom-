package org.packageId.first;


import java.util.Random;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.dataBase.sqlClass;




@Path("/registerUser")

public class RegisterUser {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String login(@FormParam("name")String name,@FormParam("password")String password,@FormParam("email")String email,@FormParam("tel")String tel,@FormParam("address")String address,@FormParam("dataEnterType")String dataEnterType) {
		int response;
		String sql;
		sql = "SELECT * FROM `user` WHERE `email` = '"+email+"'";
		response = sqlClass.rowCount(sql);
		
		if(response == 0) {
			sql = "INSERT INTO `user`(`email`, `name`, `password`, `address`, `tel`) VALUES ('"+email+"','"+name+"','"+password+"','"+address+"','"+tel+"')";
			response = sqlClass.updateIteamSql(sql, dataEnterType);	
			
			if(response == 1 ) {
				
		    	Random rand = new Random();
		    	int n1 = rand.nextInt(7);
		    	int n2 = rand.nextInt(7);
		    	int n3 = rand.nextInt(7);
		    	int n4 = rand.nextInt(7);
		    	
		    	String key = Integer.toString(n1)+""+Integer.toString(n2)+""+Integer.toString(n3)+""+Integer.toString(n4);
		    		    	
		    	sql ="UPDATE `user` SET `keyValue`='"+key+"' WHERE email= '"+email+"'";
		    	response = sqlClass.updateIteamSql(sql, "onlyThis");
		    	Login login = new Login();
		    	String id = login.userId(email);
		    	
		    	String encryptkey = Encryption.encryption(key);
				
		    	return "1,"+encryptkey+","+id;
			}
			
			return  "0,,";
		}
		
		else {
			return  "Try a differnt email address,,";
		}
		
		
		
    }

}
