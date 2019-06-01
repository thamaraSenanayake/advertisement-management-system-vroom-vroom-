package org.packageId.first;


import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.RecoverData;
import org.packageId.first.dataBase.sqlClass;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;





@Path("/loginUser")

public class Login {
	
	@POST
    @Produces(MediaType.TEXT_PLAIN)
    public String login(@FormParam("userName")String userName,@FormParam("password")String password,@FormParam("dataEnterType")String dataEnterType) {
		int response;
		String sql;
		sql = "SELECT * FROM `user` WHERE `email`= '"+userName+"'";
		response = sqlClass.rowCount(sql);
		Connection conOther = sqlClass.forDatabaseOther(); 
		
		//data recovery method run
		if(conOther != null) {
    		RecoverData obj = new RecoverData();
	    	obj.typeSerchAddControler();
    	}
		
		if(response == 1 ) {
			sql = "SELECT * FROM `user` WHERE `email`= '"+userName+"' AND `password` = '"+password+"'";
			response = sqlClass.rowCount(sql);
			
			if(response == 1 ) {
				
		    	Random rand = new Random();
		    	int n1 = rand.nextInt(7);
		    	int n2 = rand.nextInt(7);
		    	int n3 = rand.nextInt(7);
		    	int n4 = rand.nextInt(7);
		    	
		    	String key = Integer.toString(n1)+""+Integer.toString(n2)+""+Integer.toString(n3)+""+Integer.toString(n4);
		    	
		    	String id=userId(userName);
		    	
		    	sql ="UPDATE `user` SET `keyValue`='"+key+"' WHERE id= '"+id+"'";
		    	response = sqlClass.updateIteamSql(sql, "onlyThis");
		    	
		    	
		    	String encryptkey = Encryption.encryption(key);
		    	
		    	
				
		    	return "Valid user,"+encryptkey+","+id;
			}
			else {
				return "inccorrect password,0,0";	
			}
		}
		else {
			return "inccorrect Email,0,0";
		}
    }
	
	public String userId(String userName ) {
		String id=null;
		String sql ="SELECT `id`FROM `user` WHERE `email` ='"+userName+"'";
		Connection con=sqlClass.getConnection();
        
           try {
                Statement stmt = con.createStatement();
                ResultSet rs= stmt.executeQuery(sql);
                while(rs.next()){
                	id= rs.getString(1);
                }
                stmt.close();
                con.close();
            }
			
			catch (SQLException ex) {
				System.out.print(ex);  
		    }
         return id;
	}

}
