package org.packageId.first;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.packageId.first.modelN.MessageModel;




@Path("/messagees")

public class MessageResponse {
	MessageServices messageServices = new MessageServices();
	@GET
    @Produces(MediaType.APPLICATION_XML)
    public List<MessageModel> getMessage() {
        return messageServices.getAllMessage();
    }
	

}
