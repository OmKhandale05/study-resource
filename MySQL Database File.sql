-- AdminInfo Table
CREATE TABLE AdminInfo(
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_name VARCHAR(30) NOT NULL,
    admin_username VARCHAR(20) NOT NULL,
    admin_password VARCHAR(20) NOT NULL
);

-- BookData Table
CREATE TABLE BookData(
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    book_title VARCHAR(100) NOT NULL,
    book_route VARCHAR(10) NOT NULL,
    book_image_src VARCHAR(100) NOT NULL,
    book_folderlink VARCHAR(200) NOT NULL
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES AdminInfo(admin_id)
);

-- BookReferences Table
CREATE TABLE BookReferences(
    book_reference_id INT PRIMARY AUTO_INCREMENT,
    book_reference_name VARCHAR(50),
    book_reference_link VARCHAR(200)
    book_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES BookData(book_id)
);

-- Default admin data
INSERT INTO AdminInfo(admin_name, admin_username, admin_password) VALUES(
    "Omprakash Khandale",
    "omkhandale05",
    "om@123"
);