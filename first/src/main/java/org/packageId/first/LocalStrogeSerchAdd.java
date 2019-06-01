package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.LocalStrogeSerchAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/localStrogeSerchAdd")

public class LocalStrogeSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("model")String model,@FormParam("brand")String brand) {
    	LocalStrogeSerchAddControler obj = new LocalStrogeSerchAddControler();
		return obj.localStrogeSerchAddControler(model, brand);
    }
	
	


}
