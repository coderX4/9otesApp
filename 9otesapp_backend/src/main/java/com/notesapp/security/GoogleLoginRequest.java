package com.notesapp.security;

public class GoogleLoginRequest {

    private String email;
    private String uname;


    public GoogleLoginRequest(String email, String uname) {
        this.email = email;
        this.uname = uname;
    }

    public GoogleLoginRequest() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

}
