x =[-0.05:0.001:0.05];
y = x;
[X,Y] = meshgrid(x,y);
Z = -0.00001./(X.^2 + Y.^2);
surf(X,Y,Z);
axis equal