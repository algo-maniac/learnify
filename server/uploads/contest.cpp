/* Author: SOUMYAJIT NASKAR */

#include<bits/stdc++.h>
using namespace std;
#define ll long long int
#define pb push_back
#define pf push_front
#define fast_io ios_base::sync_with_stdio(false);cin.tie(0);cout.tie(0);
#define mod 1000000007
#define fr(i, n) for(ll i=0; i<n; i++)
#define fr1(i, a, b) for(ll i=a; i<=b; i++)
#define frrev(i, a, b) for (ll i = a; i >= b; --i)
#define frds(i, ds) for (auto i = ds.begin(); i != ds.end(); ++i)
#define all(x) (x).begin(), (x).end()
#define inf (1<<60)
#define lb(ds,x) lower_bound(ds.begin(), ds.end(), x)
#define ub(ds,x) upper_bound(ds.begin(), ds.end(), x)
#define N 998244353



vector<ll> sieve(ll n)
{
	ll ct=0;
	vector<bool> marked(n+1, 1);
	vector<ll> ans;
	for(ll i=2; i*i<=n; i++)
	{
		if(marked[i]==1)
		{
			for(ll j=i*i; j<=n; j+=i)
			{
				marked[j]=0;
			}
		}
	}
	for(ll i=2; i<=n; i++)
	{
		if(marked[i]){
			ans.pb(i);
		}	

	}
	return ans;
}

vector<ll> factors(ll x, vector<ll> &primes){
	vector<ll> ans;
	for(auto p:primes){
		if(p*p>x){
			if(x>1){
				ans.pb(x);
				x=1;
			}
		}
		else{
			while(x%p==0){
				ans.pb(p);
				x/=p;
			}
		}
	}
	return ans;
}





ll binpow(ll a, ll b) {
	ll res = 1;
	while (b > 0) {
		if (b & 1)
			res = res * a;
		a = a * a;
		b >>= 1;
	}
	return res;
}

double giveSqrt(ll x){
	double low = 1, high = 3e9, ans = 1.0;
	ll t=100;

	while(t--){
		double mid = (low+high)/2;

		if(mid*mid<=x){
			ans = mid;
			low = mid+1;
		}
		else
			high = mid-1;
	}

	return ans;
}




bool cmp1(pair<ll, ll> a, pair<ll, ll> b)
{
	return a.first<b.first;
}
bool cmp3(pair<ll, ll> a, pair<ll, ll> b)
{
	ll diff1=a.second-a.first;
	ll diff2=b.second-b.first;
	return diff1<=diff2;
}
bool cmp2(pair<ll, ll> a, pair<ll, ll> b)
{
	if(a.first==b.first){
		return a.second>b.second;
	}
	return a.first<b.first;
}
bool cmp(ll a, ll b){
	return a>b;
}


void precal()
{

}


void solve(){
	int n;
	cin>>n;
	vector<int> a(n), b(n);
	priority_queue<int> myself, llya;
	fr(i,n){
		cin>>a[i];
		myself.push(a[i]);
	}
	fr(i,n){
		cin>>b[i];
		llya.push(b[i]);
	}
	priority_queue<int, vector<int>, greater<int>> minHeap;
	int k=n-(n/4);
	int cpy=k;
	ll my_sum=0, llya_sum=0;
	while(cpy>0){
		my_sum+=myself.top();
		// cout<<myself.top()<<endl;
		minHeap.push(myself.top());
		myself.pop();
		llya_sum+=llya.top();
		// cout<<llya.top()<<endl;
		// cout<<endl;
		llya.pop();
		cpy--;
	}
	// cout<<my_sum<<endl;
	// cout<<llya_sum<<endl;
	if(my_sum>=llya_sum){
		cout<<0<<endl;
	}
	else{
		int ans=0;
		while(my_sum<llya_sum){
			n++;
			int newK=n-(n/4);
			// cout<<newK<<endl;
			// cout<<k<<endl;

			if(newK==k){
				my_sum+=100;
				if(!minHeap.empty()){
					my_sum-=minHeap.top();
					minHeap.pop();
				}
			}
			else{
				my_sum+=100;
				if(!llya.empty()){
					llya_sum+=llya.top();
					llya.pop();
				}
			}
			// cout<<my_sum<<endl;
			// cout<<llya_sum<<endl;
			k=newK;
			ans++;
		}
		cout<<ans<<endl;
	}

}

int main()
{
	fast_io;
	cout<<fixed;
	cout<<setprecision(10);
	precal();
	ll t=1;
	// primeSieveFactorization(sieve);
	// vector<ll> k=sieve(N);
	cin>>t;
	fr(i,t)
	{
		solve();
	}
	return 0;
}


