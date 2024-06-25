CREATE TABLE IF NOT EXISTS boxes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    box_id VARCHAR(255) NOT NULL,
    cost INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    delivery_date DATE NOT NULL default CURRENT_DATE );


    INSERT INTO boxes (box_id, cost, status, delivery_date)
        VALUES ( 'box_08062024', 330, 'filling', '2024-06-07')
        ON CONFLICT (id) DO NOTHING;

    INSERT INTO boxes (box_id, cost, status)
    VALUES ( 'box_01092024', 36000, 'filling')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO users (id, name, email, password)
    VALUES ('', '', '', '')

    CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        status  BOOLEAN NOT NULL,
        ordenno INT NOT NULL,
        parentid UUID,
        picture BYTEA,
        create_date DATE NOT NULL default CURRENT_DATE );

        INSERT INTO categories (name, description, status, ordenno, parentid, picture,create_date)
        VALUES ( 'toys', 'Toys with diferents brands', true, 1, null, null,'2024-01-01')
        ON CONFLICT (id) DO NOTHING;