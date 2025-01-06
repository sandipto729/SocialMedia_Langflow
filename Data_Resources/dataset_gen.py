import uuid
import random
import pandas as pd
from datetime import datetime, timedelta

# Define post types and engagement biases
post_types = ['Carousel', 'Reel', 'Static']
engagement_weights = {
    'Carousel': {'likes': (200, 500), 'shares': (50, 150), 'comments': (30, 100)},
    'Reel': {'likes': (300, 700), 'shares': (100, 300), 'comments': (50, 200)},
    'Static': {'likes': (50, 200), 'shares': (10, 50), 'comments': (5, 30)}
}

# Date range
start_date = datetime(2024, 12, 1)
end_date = datetime(2024, 12, 10)

# Generate data
data = []
for _ in range(300):  # Generate 300 rows
    post_id = str(uuid.uuid4())
    post_type = random.choices(post_types, weights=[40, 40, 20], k=1)[0]  # Bias: Carousel & Reel are more frequent
    likes = random.randint(*engagement_weights[post_type]['likes'])
    shares = random.randint(*engagement_weights[post_type]['shares'])
    comments = random.randint(*engagement_weights[post_type]['comments'])
    date_posted = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    
    data.append([post_id, post_type, likes, shares, comments, date_posted])

# Create DataFrame
columns = ['Post_ID', 'Post_Type', 'Likes', 'Shares', 'Comments', 'Date_Posted']
df = pd.DataFrame(data, columns=columns)

# Save dataset to CSV and JSON
df.to_csv('mock_social_media_data.csv', index=False)
df.to_json('mock_social_media_data.json', orient='records', date_format='iso')

print("Mock dataset created with 300 samples.")
