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

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Jada', 'Toys Jada', true, 2, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/jada')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Turtle Ninja', 'Toys Turtle Ninja', true, 3, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/turtleninja.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Hotwheels', 'Toys Hotwheels', true, 3, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/hw.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Dragon ball', 'Toys of Dragon ball', true, 5, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/dbz.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Disney', 'Toys of Disney', true, 6, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/disney.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'GIJOE', 'Toys of GIJOE', true, 7, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/gijoe.jpg')
        ON CONFLICT (id) DO NOTHING;


        -------------------------------------------------------------
        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Master Of The Universe', 'Toys of Master of the universe', true, 8, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/masters.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Mortal Kombat', 'Toys of  Mortal Kombat', true, 9, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/mk.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Nintendo', 'Toys of Nintendo', true, 10, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/nintendo.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Power Ranger', 'Toys of Power Ranger', true, 11, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/pr.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'WWF', 'Toys of WWF', true, 12, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/wwf.jpg')
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO categories (name, description, status, ordenno, parentid, picture)
        VALUES ( 'Cars', 'Toys of Cars', true, 13, '5b19c66a-8019-458b-9bed-d21db8cae413', '/categories/cars.jpg')
        ON CONFLICT (id) DO NOTHING;




    CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        noitem VARCHAR(500) NOT NULL,
        status  VARCHAR(100) NOT NULL,
        count_available INT NOT NULL,
        count_sold INT NOT NULL,
        count_incoming INT NOT NULL,
        investment_dollar INT NOT NULL,
        unit_price_purchase INT NOT NULL,
        sum_price_purchaseQ INT NOT NULL,
        cost_shipping_us INT NOT NULL,
        cost_shipping_gt INT NOT NULL,
        cost_shipping_unit_total INT NOT NULL,
        purchase_price INT NOT NULL,
        profit_percentage INT NOT NULL,
        sale_price INT NOT NULL,
        utility INT NOT NULL,
        picture TEXT [],
        box_id VARCHAR(100) NOT NULL,
        categories TEXT [],
        create_date DATE NOT NULL default CURRENT_DATE ,
        updated_date DATE NOT NULL default CURRENT_DATE );


        INSERT INTO products (name, noitem, status, count_available, count_sold,count_incoming,investment_dollar,
            unit_price_purchase,sum_price_purchaseQ,cost_shipping_us,cost_shipping_gt,cost_shipping_unit_total,purchase_price,
            profit_percentage,sale_price,utility,picture,box,categories)
        VALUES ( 'TMNT Cosplay Roll Down Beanie', 'BWKCM5Z65', 'enabled', 14, 2, 16,22140,
                1230,155472,672,1000,1672,11512,
                422,199,85,ARRAY ['https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_1.jpg','https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_2.jpg','https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_3.jpg'],
                'box_08062024',ARRAY ['Turtle Ninja','Accessories','toys'])
        ON CONFLICT (id) DO NOTHING;



        CREATE TABLE IF NOT EXISTS purchases (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            noitem VARCHAR(100) NOT NULL,
            box_id UUID,
            name VARCHAR(250) NOT NULL,
            qty INT NOT NULL,
            price INT NOT NULL,
            investment_dollar INT NOT NULL,
            cost INT NOT NULL,
            costotal INT NOT NULL,
            costshipUS INT NOT NULL,
            costShippingGT INT NOT NULL,
            costtotalbypurchase INT NOT NULL,
            costsaleuq INT NOT NULL,
            mu INT NOT NULL,
            pricesaleuq INT NOT NULL,
            utility INT NOT NULL,
            totalutilitybyp INT NOT NULL,
            images TEXT [],
            create_date DATE NOT NULL default CURRENT_DATE ,
            updated_date DATE NOT NULL default CURRENT_DATE );


        INSERT INTO purchases(name,noitem,qty,price,investment_dollar,images,box_id)
        VALUES('TMNT Cosplay Roll Down Beanie', 'BWKCM5Z65',3,1230,3690,
        ARRAY ['https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_1.jpg','https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_2.jpg','https://storage.googleapis.com/xfamily-xmanager/products/BWKCM5Z65_3.jpg'],
        'box_08062024')
        ON CONFLICT (id) DO NOTHING;





        CREATE TABLE IF NOT EXISTS clients (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(250)  NOT NULL,
            city VARCHAR(250)  NOT NULL,
            zone INT NOT NULL,
            phone INT NOT NULL,
            create_date DATE NOT NULL default CURRENT_DATE ,
            updated_date DATE NOT NULL default CURRENT_DATE );


        CREATE TABLE IF NOT EXISTS shippings (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            client_id UUID NOT NULL,
            shipping_cost INT NOT NULL,
            status VARCHAR(50) NOT NULL,
            create_date DATE NOT NULL default CURRENT_DATE ,
            updated_date DATE NOT NULL default CURRENT_DATE );


        CREATE TABLE IF NOT EXISTS sales (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                id_shipping UUID NOT NULL,
                noitem VARCHAR(100) NOT NULL,
                qty INT NOT NULL,
                price INT NOT NULL,
                discount INT NOT NULL,
                total INT NOT NULL,
                create_date DATE NOT NULL default CURRENT_DATE ,
                updated_date DATE NOT NULL default CURRENT_DATE );



                INSERT INTO clients(name,address,city,zone,phone)
                VALUES('Marco Catalán', '7 calle 11-48 granjas san cristobal zona 8 mixco','Guatemala/Mixco',8,32275569)
                ON CONFLICT (id) DO NOTHING;

                INSERT INTO sales(id_shipping,noitem,qty,price,discount,total)
                VALUES('662d2ad6-60f2-4b23-9d17-c90329d4530d','JD31124',8,1250,0,1000)
                ON CONFLICT (id) DO NOTHING;

                INSERT INTO shippings(client_id,shipping_cost,status)
                VALUES('f63eb040-9f29-4b81-84cf-84da682a7e69',2500,'delivered')
                ON CONFLICT (id) DO NOTHING;


                
        CREATE TABLE IF NOT EXISTS departaments (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            departamento VARCHAR(100) NOT NULL,
            municipio json,
            updated_date DATE NOT NULL default CURRENT_DATE );


            insert into departaments(departamento, municipio)
            values('Guatemala', '[{"Municipio":"Mixco", "zonas":[1,2,3,4,5,6,7,8,9,10,11]}, {"Municipio":"Guatemala", "zonas":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25]}, {"Municipio": "Villa Nueva", "zonas":[1,2,3,4,5,6,7,8,9,10,11,12]}]')



            insert into departaments(departamento, municipio)
            values('Escuintla', '[{"Municipio":"Escuintla", "zonas":[1,2,3,4,5]}, {"Municipio":"Palín", "zonas":[1]}]')