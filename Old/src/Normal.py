import requests
from math import log2, log10, sqrt

def get_data():

    r = requests.get("https://labs.api.listenbrainz.org/similar-artists/json?artist_mbid=8f6bd1e4-fbe1-4f50-aa9b-94c450ec0f11&algorithm=session_based_days_7500_session_300_contribution_5_threshold_10_limit_100_filter_True_skip_30")
    return r.json()[3]["data"]

# fetch the data
data = get_data()

# find the max score
hi = 0
for d in data:
    score = d["score"]
    hi = max(hi, score)

# Find the sqrt of the max score
hi = sqrt(score)

# Now print all the normalized values, since we know the max sqrt value
for d in data:
    score = d["score"]
    print("%d sqrt: %.3f sqrt norm: %3f" % (score, sqrt(score), sqrt(score) / hi))