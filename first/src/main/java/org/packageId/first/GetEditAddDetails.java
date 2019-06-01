package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.getEditAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/getEditAdd")

public class GetEditAddDetails {
	MessageServices messageServices = new MessageServices();
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("key")String key,@FormParam("id")String id,@FormParam("addId")String addId) {
    	int check = Encryption.keyCheck(key, id);
    	
    	if(check == 1) {
    		getEditAddControler obj = new getEditAddControler();
    		return obj.getAllAdds(addId);
    	}
    	else {
    		return null;
    	}
    	
    }

}
