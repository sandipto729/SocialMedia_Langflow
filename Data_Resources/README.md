# Dataset Section

## Overview
This section of the repository focuses on the **Mock Social Media Engagement Dataset** created for the Pre-Hackathon Assignment: "Social Media Performance Analysis." The dataset is designed to mimic real-world trends in social media engagement, providing a foundation for meaningful analysis using Langflow and DataStax Astra DB.

---

## Python Script: `dataset_gen.py`

### **Purpose**
The Python script `dataset_gen.py` generates a realistic dataset of 300 samples that simulate social media engagement metrics for different post types. The script ensures:
- Adequate dataset size for meaningful analysis.
- Trends and biases that resemble real-world social media performance.
- Clean and structured output in both CSV and JSON formats for ease of use.

### **How It Works**
1. **Post Types and Engagement Biases:**
   - Post types include `Reel`, `Carousel`, and `Static Image`.
   - Engagement metrics (likes, shares, comments) are generated with bias reflecting real-world trends:
     - **Reels:** Highest engagement.
     - **Carousel:** Moderate engagement.
     - **Static Images:** Lowest engagement.

2. **Dataset Attributes:**
   - `Post_ID`: Unique identifier for each post.
   - `Post_Type`: Type of post (e.g., Reel, Carousel, Static).
   - `Likes`, `Shares`, `Comments`: Engagement metrics.
   - `Date_Posted`: Timestamp of the post.

3. **Output:**
   - A structured dataset saved as `mock_social_media_data.csv` and `mock_social_media_data.json`.

### **Key Trends Introduced**
- **Post Type Frequency Bias:** Reels and Carousels are more frequent than Static Images, reflecting their popularity in real-world social media use.
- **Engagement Metrics:**
  - Reels drive the highest engagement, with an average of 2x more comments and 50% more likes than other formats.
  - Carousel posts perform better than Static Images but are less effective than Reels.
  - Static Images show minimal engagement, aligning with trends of lower interaction for static content.

---

## Expected Insights
When the dataset is analyzed, these insights are expected:

1. **Performance by Post Type:**
   - Reels consistently outperform other formats in likes, shares, and comments.
   - Carousel posts serve as a balanced medium, offering moderate engagement.
   - Static Images have limited engagement potential and may not be ideal for high-interaction goals.

2. **Strategic Insights:**
   - Focus on Reels to maximize engagement.
   - Carousel posts can be used as an alternative for diverse content strategies.

3. **Frequency Trends:**
   - The dominance of Reels and Carousel posts aligns with their real-world popularity.
   - Static Images, though less frequent, may be used for niche purposes.

---

## Real-World Alignment Efforts
To ensure the dataset closely resembles real-world social media trends:
1. **Bias Introduction:**
   - Engagement metrics are weighted to reflect typical user behavior.
   - Frequency distribution mimics the content strategy of modern brands.

2. **Realistic Ranges:**
   - Likes, shares, and comments are generated within ranges that align with observed social media statistics.

3. **Comprehensive Dataset:**
   - 300 samples ensure statistical significance and meaningful trend analysis.

---

## File Outputs
- `mock_social_media_data.csv`: A CSV file containing the dataset.
- `mock_social_media_data.json`: A JSON file containing the same dataset for flexibility in usage.

---

## Conclusion
This dataset forms the foundation for meaningful insights into social media performance trends. By embedding realistic biases and trends, it ensures alignment with actual user behaviors, making it an effective tool for analysis in the "Social Media Performance Analysis" project.

