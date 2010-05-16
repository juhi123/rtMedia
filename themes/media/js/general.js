//var j = 'jQuery';
/* alert('HELLO'); */
jQuery(document).ready(function(){
    jQuery('.star').rating();
    jQuery('.star').rating('readOnly');

    /**
     * album jq
     */

    //message box manipulation for various events
    // Upload tab - album selection

    jQuery('#rt-album-choice-existing').live('click',function(){
		jQuery('#rt-selected-album').fadeIn('slow');    
        jQuery('#rt-create-album').fadeOut('slow'); 
        jQuery('#kaltura_contribution_wizard_wrapper').css("display","block");
        jQuery('.rt-album-message p').remove();
        jQuery('.rt-album-message').append('<p>Select Album before Uoloading media</p>');
    });
    jQuery('#rt-album-choice-new').live('click',function(){
		jQuery('#rt-selected-album').fadeOut('slow');    
        jQuery('#rt-create-album').fadeIn('slow'); 
        jQuery('#kaltura_contribution_wizard_wrapper').css("display","none");
        jQuery('.rt-album-message p').remove();
        jQuery('.rt-album-message').append('<p>Create Album to Upload Media</p>');

    });

    //when go button clicked on album creation
    jQuery('#rt-create-album-button').live('click',function(){
        //this adds a new message to the green message bar
        var visibility='';
        var new_album_name = '';
        new_album_name = jQuery('#rt-new-album-name').val();
        if(new_album_name == ''){ //if album name is keppt blank
            jQuery('.rt-album-message p').remove();
            jQuery('.rt-album-message').append('<p>Album Name Blank!</p>');
            return false;
        }else{//do nothing
            
        }

        visibility = jQuery('#rt-create-album input:radio:checked').val();
        var data = {
            action: 'create_new_album',
            new_album_name : new_album_name,
            visibility : visibility
        };

        jQuery.post(ajaxurl, data, function(response) {
            response1 = response;
            var test = response.split('@#@')
            if(test[0] == 'nops'){//if album exist then do not create
                jQuery('.rt-album-message p').remove();
                jQuery('.rt-album-message').append('<p>Album Name already exist. Please try another name!</p>');
            //                jQuery('.rt-album-message p').text('Album Name already exist. Please try another name');
            }
            else{ //send success message as well as display embeded KCW
                
                jQuery('.rt-album-message p').remove();
                jQuery('.rt-album-message').append('<p>Album Created. Upload Media</p>');
                jQuery('#kaltura_contribution_wizard_wrapper').css("display","block");
            }
        });
    });


    //jquery for album in upload tab. (only available under media tab and not in group)
    jQuery('#rt-album-list-ul li').live('click',function(){
        album_name = this.innerHTML;
        //album name is added as a class to the album thumb images so that its easy to show hide.
        //only "this" album name will be shown and all others are kept hidden
        //Most funny code I have ever written in jquery :D Enjoyed this a lot!
        var data = {
            action: 'rt_fetch_images_for_album',
            album_name : album_name
        };

        jQuery.post(ajaxurl, data, function(response) {
            jQuery('#rt-pics-list li').remove();
            jQuery('#rt-pics-list').append(response);
//        jQuery('#rt-pics-list li').each(function(index) {
//              if(jQuery(this).is('.'+album_name)){
//                    jQuery(this).removeAttr('display');
//                    jQuery(this).removeAttr('style');
//                    jQuery(this).attr('display','inline');
//              }else{
//                  jQuery(this).hide();
//              }
//        });

        });

        //this with come in respose.
    });
});