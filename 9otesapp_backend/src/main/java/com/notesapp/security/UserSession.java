package com.notesapp.security;

public class UserSession {

    private int id;
    private String uname;
    private String email;
    private String password;

    public UserSession() {
    }

    public UserSession(int id,String uname, String email, String password) {
        this.id = id;
        this.uname = uname;
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
