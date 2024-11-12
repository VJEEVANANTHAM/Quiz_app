const arr=[5,2,3,4,5];

var left=0,leftmax=0,right=arr.length-1,rightmax=0;
var water=0;

while(left<right){
    if(arr[left]<arr[right]){
        if(arr[left]>leftmax){
            leftmax=arr[left]
        }
        else{
            water+=leftmax-arr[left];
        }
        left++;

    }
    else{
        if(arr[right]>rightmax){
            rightmax=arr[right]
        }
        else{
            water+=rightmax-arr[right]
        }
        right--;
    }


}
console.log(water)