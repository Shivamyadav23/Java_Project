package com.vita.JWT;

public class MyUser {
    private String username;
    private String password;

    public MyUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public MyUser() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "MyUser [username=" + username + ", password=" + password + "]";
    }
}
