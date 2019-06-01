package org.packageId.first;


import java.sql.Connection;
import java.util.Random;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.RecoverData;
import org.packageId.first.dataBase.sqlClass;




@Path("/loginCompany")

public class LoginCompany {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String login(@FormParam("comName")String comName,@FormParam("password")String password,@FormParam("dataEnterType")String dataEnterType) {
		int response;
		String sql;
		sql = "SELECT * FROM `company` WHERE `name`= '"+comName+"'";
		response = sqlClass.rowCount(sql);
		Connection conOther = sqlClass.forDatabaseOther(); 
		
		if(response == 1 ) {
			sql = "SELECT * FROM `company` WHERE `name`= '"+comName+"' AND `password` = '"+password+"'";
			response = sqlClass.rowCount(sql);
			
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
		    	
		    	if(conOther != null) {
		    		RecoverData obj = new RecoverData();
			    	obj.typeSerchAddControler();
		    	}
		    	
				
		    	return "Valid user,"+encryptkey+","+comName;
			}
			else {
				return "inccorrect password,0,0";	
			}
		}
		else {
			return "inccorrect company name,0,0";
		}
    }

}
