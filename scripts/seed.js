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