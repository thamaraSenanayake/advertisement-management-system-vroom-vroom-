package org.packageId.first;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.controller.TypeSerchAddControler;
import org.packageId.first.modelN.advertismentModel;




@Path("/typeSerchAdd")

public class TypeSerchAdd {
	@POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<advertismentModel> getMessage(@FormParam("model")String model,@FormParam("brand")String brand) {
    	TypeSerchAddControler obj = new TypeSerchAddControler();
		return obj.typeSerchAddControler(model, brand);
    }
	
	


}
