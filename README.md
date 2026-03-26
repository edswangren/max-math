# TEKS Math Tutor — Grade 6

Interactive math practice app covering the full Texas TEKS 6th grade math curriculum. Built for tutoring sessions — template-based problem generation with instant feedback, progress tracking, and printable worksheets.

## Features

- **174 problem templates** across all 48 TEKS standards (5 strands)
- **3 difficulty levels** per topic (Easy / Medium / Hard)
- **Interactive practice** — type answer, get instant right/wrong feedback
- **Template-based generation** — infinite randomized problems with guaranteed integer solutions
- **Progress tracking** — per-topic accuracy stored in browser localStorage
- **Session history** — date, topic, score log
- **Weak spot detection** — surfaces high-error-rate topics for extra practice
- **Printable worksheets** — print-friendly layout with answer key

## TEKS Coverage

| Strand | Standards | Topics |
|--------|-----------|--------|
| Number & Operations | 6.2–6.3 | Rational numbers, integers, absolute value, operations |
| Proportionality | 6.4–6.5 | Ratios, rates, percents, unit conversions, proportions |
| Expressions/Equations | 6.6–6.10 | Expressions, equations, geometry, inequalities |
| Measurement & Data | 6.11–6.13 | Coordinate plane, statistical graphs, measures of center/spread |
| Financial Literacy | 6.14 | Checking/debit/credit, budgets, credit history |

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npx vitest run    # run tests (246 tests)
```

## Deploy to AWS (S3 + CloudFront)

Step-by-step CLI instructions. Total cost: effectively $0/mo for single-user traffic.

### Prerequisites

- AWS CLI installed and configured (`aws configure`)
- A domain is optional — CloudFront gives you a `*.cloudfront.net` URL

### 1. Create an S3 bucket

```bash
BUCKET_NAME=teks-math-tutor
AWS_REGION=us-east-1

aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION
```

### 2. Build the app

```bash
npm run build
```

### 3. Upload to S3

```bash
aws s3 sync dist/ s3://$BUCKET_NAME --delete
```

### 4. Create a CloudFront distribution

Create a config file:

```bash
cat > /tmp/cf-config.json << 'CFEOF'
{
  "CallerReference": "teks-tutor-initial",
  "Comment": "TEKS Math Tutor",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-teks-math-tutor",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": { "Forward": "none" }
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-teks-math-tutor",
        "DomainName": "teks-math-tutor.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultRootObject": "index.html",
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
CFEOF
```

Create the distribution:

```bash
aws cloudfront create-distribution \
  --distribution-config file:///tmp/cf-config.json
```

Note the `DomainName` in the output (e.g., `d1234abcdef.cloudfront.net`).

### 5. Set S3 bucket policy for CloudFront access

```bash
cat > /tmp/bucket-policy.json << BPEOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
BPEOF

aws s3api put-bucket-policy \
  --bucket $BUCKET_NAME \
  --policy file:///tmp/bucket-policy.json
```

### 6. Deploy updates

After making changes:

```bash
npm run build
aws s3 sync dist/ s3://$BUCKET_NAME --delete
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

Replace `YOUR_DIST_ID` with your CloudFront distribution ID from step 4.

### Quick deploy script

Save as `deploy.sh` in the project root:

```bash
#!/bin/bash
set -e
BUCKET=teks-math-tutor
DIST_ID=YOUR_DIST_ID

npm run build
aws s3 sync dist/ s3://$BUCKET --delete
aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
echo "Deployed!"
```

```bash
chmod +x deploy.sh
./deploy.sh
```
