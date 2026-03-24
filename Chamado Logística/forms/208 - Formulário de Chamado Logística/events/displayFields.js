function displayFields(form, customHTML) {
    // Esconder botão de impressão
    form.setHidePrintLink(true);

    customHTML.append("<script>");
    // Variáveis de formulário - https://tdn.totvs.com/pages/releaseview.action?pageId=75270483
    customHTML.append("function getFormMode() { return '"+ form.getFormMode() + "'; }");
    customHTML.append("function getCompanyId() { return "+ form.getCompanyId() + "; }");
    customHTML.append("function getDocumentId() { return "+ form.getDocumentId() + "; }");
    customHTML.append("function getVersion() { return "+ form.getVersion() + "; }");
    customHTML.append("function getCardIndex() { return "+ form.getCardIndex() + "; }");
    customHTML.append("function getMobile() { return "+ form.getMobile() + "; }");

    // Variáveis de documento
    customHTML.append("function getWKUser() { return '"+ getValue("WKUser") + "'; }");
    customHTML.append("function getWKPrivateDocument() { return '"+ getValue("WKPrivateDocument") + "'; }");
    customHTML.append("function getWKDocumentTypeId() { return '"+ getValue("WKDocumentTypeId") + "'; }");
    customHTML.append("function getWKNumAcess() { return '"+ getValue("WKNumAcess") + "'; }");
    customHTML.append("function getWKComments() { return '"+ getValue("WKComments") + "'; }");
    customHTML.append("function getWKAuthor() { return '"+ getValue("WKAuthor") + "'; }");
    customHTML.append("function getWKCreateDate() { return '"+ getValue("WKCreateDate") + "'; }");
    customHTML.append("function getWKDescription() { return '"+ getValue("WKDescription") + "'; }");
    customHTML.append("function getWKNumDocument() { return '"+ getValue("WKNumDocument") + "'; }");
    customHTML.append("function getWKNumVersion() { return '"+ getValue("WKNumVersion") + "'; }");
    customHTML.append("function getWKExpirationDate() { return '"+ getValue("WKExpirationDate") + "'; }");
    customHTML.append("function getWKExpires() { return '"+ getValue("WKExpires") + "'; }");
    customHTML.append("function getWKFileSize() { return '"+ getValue("WKFileSize") + "'; }");
    customHTML.append("function getWKKeyWord() { return '"+ getValue("WKKeyWord") + "'; }");
    customHTML.append("function getWKVolume() { return '"+ getValue("WKVolume") + "'; }");
    customHTML.append("function getWKSubject() { return '"+ getValue("WKSubject") + "'; }");
    customHTML.append("function getWKNumParentDocument() { return '"+ getValue("WKNumParentDocument") + "'; }");
    customHTML.append("function getWKDocumentType() { return '"+ getValue("WKDocumentType") + "'; }");
    customHTML.append("function getWKState() { return "+ getValue("WKState") + "; }");
    customHTML.append("function getWKCompany() { return '"+ getValue("WKCompany") + "'; }");
    customHTML.append("function getWKServerURL() { return '"+ fluigAPI.getPageService().getServerURL() + "'; }");

    // Variáveis de processo
    customHTML.append("function getWKNumState(){ return " + getValue("WKNumState") + "; }");
    customHTML.append("function getWKNumProcess(){ return " + getValue("WKNumProces") + "; }");
    customHTML.append("</script>");
}