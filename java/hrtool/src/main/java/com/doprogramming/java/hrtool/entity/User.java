package com.doprogramming.java.hrtool.entity;

import com.doprogramming.java.hrtool.util.Constants;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Rajith
 *
 */
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Table(name = "hrtool_user")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique = true, nullable = false)
    private String email;
    private String phoneNumber;
    private String password;
    private boolean isActive;

    @Column(name = "last_login")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = Constants.dateFormat)
    private Date lastLogin;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = Constants.dateFormat)
    @CreationTimestamp
    @Column(updatable = false)
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = Constants.dateFormat)
    @UpdateTimestamp
    private Date modifiedDate;

}
