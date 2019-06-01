package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.DisplayAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/displayAdd")

public class displayAdd {
	MessageServices messageServices = new MessageServices();
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("key")String key,@FormParam("id")String id) {
		//advertismentModel add = new advertismentModel(1,"brand","model","year","condtion","five","six","seven","eight","nine");
    	int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		DisplayAddControler obj = new DisplayAddControler();
    		return obj.getAllAdds();
    	}
    	else {
    		System.out.print("invalid key");
    		return null;
    	}
    	
    }
	
	


}
