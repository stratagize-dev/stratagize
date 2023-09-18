ALTER TABLE activities
    ALTER COLUMN sport_type TYPE sport_type
        USING sport_type::text::sport_type;