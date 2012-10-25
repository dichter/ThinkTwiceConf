/**
 * Sets the status of a session to approved and sends a notification email
 */
function approveSession(sessiondoc:NotesDocument){
	sessiondoc.replaceItemValue("Status", "Approved");
	sessiondoc.computeWithForm(false, false);
	sessiondoc.save();
	emailBean.setSendTo(sessiondoc.getItemValueString("CreatedBy"));
	emailBean.setSubject(controlpanelBean.getSessionEmailAcceptedSubject());
	emailBean.setSenderEmail(controlpanelBean.getSessionEmailFromEmail());
	emailBean.setSenderName(controlpanelBean.getSessionEmailFromName());
	var body = controlpanelBean.getSessionEmailAcceptedBody();
	body = @ReplaceSubstring(body, "@sessiontitle@", sessiondoc.getItemValueString("Title"));
	emailBean.addHTML(body);
	emailBean.send();
}

/**
 * Sets the status of a session to rejected and sends a notification email
 * Also makes sure the session is not published
 */
function rejectSession(sessiondoc:NotesDocument){
	sessiondoc.replaceItemValue("Status", "Unapproved");
	sessiondoc.computeWithForm(false, false);
	sessiondoc.save();
	emailBean.setSendTo(sessiondoc.getItemValueString("CreatedBy"));
	emailBean.setSubject(controlpanelBean.getSessionEmailRejectedSubject());
	emailBean.setSenderEmail(controlpanelBean.getSessionEmailFromEmail());
	emailBean.setSenderName(controlpanelBean.getSessionEmailFromName());
	var body = controlpanelBean.getSessionEmailRejectedBody();
	body = @ReplaceSubstring(body, "@sessiontitle@", sessiondoc.getItemValueString("Title"));
	emailBean.addHTML(body);
	emailBean.send();
	unpublishSession(sessiondoc);
}

/**
 * Marks a session as published which means that all users can see it
 * Until this point only admins and the creator can see it
 */
function publishSession(sessiondoc:NotesDocument){
	sessiondoc.replaceItemValue("Published", "Yes");
	sessiondoc.computeWithForm(false, false);
	sessiondoc.save();
}

/**
 * Marks a session as unpublished which means only admins and the creator can see it
 */
function unpublishSession(sessiondoc:NotesDocument){
	sessiondoc.replaceItemValue("Published", "No");
	sessiondoc.computeWithForm(false, false);
	sessiondoc.save();
}