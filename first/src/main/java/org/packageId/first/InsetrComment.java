package org.packageId.first;



import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


import org.packageId.first.dataBase.sqlClass;

@Path("/insetrComment")

public class InsetrComment {
	@POST
	@Produces(MediaType.TEXT_PLAIN)
    public String getMessage(@FormParam("commentText")String commentText,@FormParam("addId")String addId,
    		@FormParam("key")String key,@FormParam("id")String id,@FormParam("dataEnterType")String dataEnterType) {
		int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		String sql ="INSERT INTO `comment`(`commentText`, `addId`, `userID`) VALUES ('"+commentText+"','"+addId+"','"+id+"')";
    		int response = sqlClass.updateIteamSql(sql, dataEnterType);
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

