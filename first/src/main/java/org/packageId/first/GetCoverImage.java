package org.packageId.first;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.packageId.first.dataBase.sqlClass;






@Path("/getCoverImage")

public class GetCoverImage {
	@POST
    @Produces("img/jpg")
    public String getMessage(@FormParam("userID") String userID,@FormParam("type") String type) {
		
		String sql ="SELECT `location` FROM `company` WHERE `name` = '"+userID+"'";
		
		if(type.equals("profile")) {
			sql ="SELECT `location` FROM `company` WHERE `email` = '"+userID+"'";
		}

		Connection con=sqlClass.getConnection();
        String location = null;
           try {
                Statement stmt = con.createStatement();
                ResultSet rs= stmt.executeQuery(sql);
                while(rs.next()){
                	location= rs.getString(1);
                	return location;
                }
                stmt.close();
                con.close();
            }
			
			catch (SQLException ex) {
				System.out.print(ex);  
		    }
		return null;
           
    	
    	
    }

}
